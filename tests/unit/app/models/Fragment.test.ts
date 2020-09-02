
import sinon from 'sinon';

import '@/tests/setup';
import { Fragment } from '@/app/models/Fragment';


const getInstance = (props = {}) => {
  const fragment = new Fragment({
    concept: 'concept',
    ...props,
  });

  const fr = getFileReader();

  sinon.stub(fragment, 'getFileReader').returns(fr);

  return { fragment, fr };
};

const getFile = () => {
  const file: Partial<File> = {
    size: 1024,
    name: 'Somefile.jpg',
    type: 'image/jpg',
  };

  return file;
};

const getFileReader = () => {
  const fr: any = {
    result: 'VALUE',
    readAsDataURL: sinon.spy(() => fr.onload()),
  };

  return fr;
};

describe('unit.app.models.Fragment', () => {
  afterEach(() => sinon.restore());

  describe('.constructor', () => {
    it('Creates a Fragment', () => {
      const { fragment } = getInstance();
      expect(fragment.constructor.name).toEqual('Fragment');
    });
  });

  describe('.setFile', () => {
    it('Stores the file', async () => {
      const { fragment, fr } = getInstance();
      const file = getFile() as File;

      await fragment.setFile(file);

      expect(fr.readAsDataURL.called).toEqual(true);
      expect(fragment.file).toEqual(file);
    });

    it('Sets the metadata', async () => {
      const { fragment } = getInstance();
      const file = getFile() as File;

      await fragment.setFile(file);

      expect(fragment.meta.filename).toEqual(file.name);
      expect(fragment.meta.size).toEqual(file.size);
      expect(fragment.meta.mime).toEqual(file.type);
    });

    it('Sets the data', async () => {
      const { fragment } = getInstance();
      const file = getFile() as File;

      await fragment.setFile(file);

      expect(fragment.data).toEqual('VALUE');
    });
  });
});
