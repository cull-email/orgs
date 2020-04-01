import path from 'path';
import { promises as fs } from 'fs';
import Organization from '@cull/schema/build/main/organization';
import Sender from '@cull/schema/build/main/sender';

const input = './src/data';
const output = './build';

(async () => {
  let dirents = await fs.readdir(input, { withFileTypes: true });
  let organizations: Organization[] = [];
  let senders: Sender[] = [];
  for (let dirent of dirents) {
    if (dirent.isDirectory()) {
      let subdir = path.resolve(input, dirent.name);
      let o = await getOrganization(subdir);
      organizations.push(o);
      let s = await getSenders(o.id, subdir);
      if (s.length > 0) {
        senders = senders.concat(s);
      }
    }
  }
  fs.writeFile(path.resolve(output, 'organizations.json'), JSON.stringify(organizations), 'utf8');
  fs.writeFile(path.resolve(output, 'senders.json'), JSON.stringify(senders), 'utf8');
})();

async function getOrganization(dir: string): Promise<Organization> {
  let filepath = path.resolve(dir, 'organization.json');
  let data = await fs.readFile(filepath, 'utf8');
  let parsed = JSON.parse(data as string);
  if (!parsed.id || parsed.id === '') {
    throw new Error(`No valid id specified for organization in ${filepath}.`);
  }
  let org = new Organization({
    ...parsed,
    ignore: false,
    feature: false
  });
  if (org.domains.filter(d => d !== '').length === 0) {
    throw new Error(`No valid domains specified for organization in ${filepath}.`);
  }
  return org;
}

async function getSenders(organizationId: string, dir: string): Promise<Sender[]> {
  let filepath = path.resolve(dir, 'senders.json');
  let senders: Sender[] = [];
  let exists = false;
  await fs
    .stat(filepath)
    .then(() => {
      exists = true;
    })
    .catch(() => {
      // file not present, nothing to do.
    });
  if (exists) {
    let data = await fs.readFile(filepath, 'utf8');
    let collection = JSON.parse(data as string);
    if (collection.length > 0) {
      collection.forEach(s => {
        if (!s.id || s.id === '') {
          throw new Error(`No valid id specified for sender in ${filepath}`);
        }
        let sender = new Sender({
          ...s,
          organizationId,
          ignore: false,
          feature: false
        });

        if (sender.addresses.filter(a => a !== '').length === 0) {
          throw new Error(`No valid addresses specfied for sender in ${filepath}.`);
        }
        senders.push(sender);
      });
    }
  }
  return senders;
}
