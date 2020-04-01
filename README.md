# orgs for [Cull](https://cull.email)

A public database of organizations and senders.

## About

This is a curated list of [_organizations_](https://github.com/cull-email/schema#organization) and [_senders_](https://github.com/cull-email/schema#sender) of email conforming to [@cull/schema](https://github.com/cull-email/schema).

Organizations and, optionally, their associated senders are located in logically grouped subdirectories in `src/data`.

- Every subdirectory must include an organization as `organization.json`.
- A subdirectory may include senders as `senders.json`.
- Every organization and sender must specify a valid [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)) for the `id`.
- Every organization must contain `name`, `url` and at least one domain in `domains`.
- Every sender must contain at least one address in `addresses`.
- All other properties assumed optional and may be omitted.

At build time:

- `ignore` and `feature` will be forced to `false`.
- Senders will have `organizationId` assigned.

## Updates

This repository serves as a public, community-driven, trusted source for use with [Cull](https://cull.email).

Additions and/or modifications may be requested via pull request.

## Development

[`makefile`](https://github.com/cull-email/orgs/blob/master/makefile) codifies directives for building and other development oriented tasks.
