
import sinon from 'sinon';
import { expect } from 'chai';

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

describe('tests.unit.app.models.Fragment', () => {
  afterEach(() => sinon.restore());

  describe('.constructor', () => {
    it('Creates a Fragment', () => {
      const { fragment } = getInstance();
      expect(fragment.constructor.name).to.be.equal('Fragment');
    });
  });

  describe('.setFile', () => {
    it('Stores the file', async () => {
      const { fragment, fr } = getInstance();
      const file = getFile() as File;

      await fragment.setFile(file);

      expect(fr.readAsDataURL.called).to.be.equal(true);
      expect(fragment.file).to.be.deep.equal(file);
    });

    it('Sets the metadata', async () => {
      const { fragment } = getInstance();
      const file = getFile() as File;

      await fragment.setFile(file);

      expect(fragment.meta.filename).to.be.equal(file.name);
      expect(fragment.meta.size).to.be.equal(file.size);
      expect(fragment.meta.mime).to.be.equal(file.type);
    });

    it('Sets the data', async () => {
      const { fragment } = getInstance();
      const file = getFile() as File;

      await fragment.setFile(file);

      expect(fragment.data).to.be.equal('VALUE');
    });
  });
});
