import * as fs from 'fs';

import { FileStorage } from '~/src/models/Model';
import { getAwsClient } from '~/tests/utils/aws';

describe('tests.integration.app.api.aws.AwsClient', () => {
  const context = {
    refs: <Array<{ namespace: string; uuid: string }>>[],
    files: <Array<{ namespace: string; uuid: string; metadata: any }>>[],
  };

  afterEach(async () => {
    const { client } = getAwsClient();

    await Promise.all(
      context.refs.map((ref: any) => client.remove(ref.namespace, ref.uuid)),
    );

    await Promise.all(
      context.files.map((ref: any) => client.deleteFile(ref.namespace, ref.uuid, ref.metadata)),
    );

    context.refs = [];
    context.files = [];
  });

  describe('Handles queries', () => {
    it('Lists an empty table', async () => {
      const namespace = 'projects';
      const { client } = getAwsClient();

      const items = await client.list(namespace);

      expect(items).toEqual([]);
    });

    it('Returns null when the item is not found', async () => {
      const namespace = 'projects';
      const uuid = 'fake-uuid';
      const { client } = getAwsClient();

      const item = await client.retrieve(namespace, uuid);

      expect(item).toEqual(null);
    });

    it('Creates and retrieves a project', async () => {
      const namespace = 'projects';
      const project = {
        uuid: 'uuid1',
        name: 'Project 1',
        description: 'Description',
      };

      context.refs.push({ namespace, uuid: project.uuid });

      const { client } = getAwsClient();
      await client.create(namespace, project);

      const item = await client.retrieve(namespace, project.uuid);

      expect(item).toEqual(project);
    });

    it('Updates an existing entry', async () => {
      const namespace = 'projects';
      const project = {
        uuid: 'uuid1',
        name: 'Project 1',
        description: 'Description',
      };
      const updated = {
        ...project,
        description: 'New Description',
      };

      context.refs.push({ namespace, uuid: project.uuid });

      const { client } = getAwsClient();

      await client.create(namespace, project);
      await client.update(namespace, project.uuid, updated);

      const item = await client.retrieve(namespace, project.uuid);

      expect(item).toEqual(updated);
    });


    it('Deletes an entry', async () => {
      const namespace = 'projects';
      const project = {
        uuid: 'uuid1',
        name: 'Project 1',
        description: 'Description',
      };

      context.refs.push({ namespace, uuid: project.uuid });

      const { client } = getAwsClient();
      await client.create(namespace, project);
      await client.remove(namespace, project.uuid);

      const item = await client.retrieve(namespace, project.uuid);

      expect(item).toEqual(null);
    });
  });

  describe('Handles files.', () => {
    const file = fs.readFileSync(__filename);

    it('Uploads the file', async () => {
      const namespace = 'fragments';
      const uuid = 'uuid1';
      const metadata = { filename: 'filename', size: 1024, mime: 'application/javascript', storage: FileStorage.PREVIEW };

      const { client } = getAwsClient();
      context.files.push({ namespace, uuid, metadata });

      await client.uploadFile(namespace, uuid, metadata, file);
      await client.headFile(namespace, uuid, metadata);
    });
  });
});
