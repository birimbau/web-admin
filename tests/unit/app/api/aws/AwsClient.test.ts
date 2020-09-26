
import sinon from 'sinon';

import '~/tests/setup';
import { getAwsClient } from '~/tests/utils/aws';


const BOOLEAN = [
  { BOOL: true },
  true,
];

const STRING = [
  { S: 'string' },
  'string',
];

const NUMBER = [
  { N: '1' },
  1,
];

const ARRAY_BOOLEANS = [
  { L: [BOOLEAN[0], BOOLEAN[0], BOOLEAN[0]] },
  [BOOLEAN[1], BOOLEAN[1], BOOLEAN[1]],
];

const ARRAY_STRINGS = [
  { L: [STRING[0], STRING[0], STRING[0]] },
  [STRING[1], STRING[1], STRING[1]],
];

const ARRAY_NUMBERS = [
  { L: [NUMBER[0], NUMBER[0], NUMBER[0]] },
  [NUMBER[1], NUMBER[1], NUMBER[1]],
];

const MAP_ONE_BOOLEAN = [
  { M: { field: BOOLEAN[0] } },
  { field: BOOLEAN[1] },
];

const MAP_ONE_STRING = [
  { M: { field: STRING[0] } },
  { field: STRING[1] },
];

const MAP_ONE_NUMBER = [
  { M: { field: NUMBER[0] } },
  { field: NUMBER[1] },
];

const MAP_BOOLEAN_STRING_NUMBER = [
  { M: { boolean: BOOLEAN[0], string: STRING[0], number: NUMBER[0] } },
  { boolean: BOOLEAN[1], string: STRING[1], number: NUMBER[1] },
];

const MAP_WITH_ARRAY = [
  { M: { array: ARRAY_STRINGS[0], field: BOOLEAN[0] } },
  { array: ARRAY_STRINGS[1], field: BOOLEAN[1] },
];

const ARRAY_WITH_MAP = [
  { L: [MAP_ONE_STRING[0], MAP_ONE_STRING[0], MAP_ONE_STRING[0]] },
  [MAP_ONE_STRING[1], MAP_ONE_STRING[1], MAP_ONE_STRING[1]],
];


const fields = {
  BOOLEAN,
  STRING,
  NUMBER,
  ARRAY_BOOLEANS,
  ARRAY_STRINGS,
  ARRAY_NUMBERS,
  MAP_ONE_BOOLEAN,
  MAP_ONE_STRING,
  MAP_ONE_NUMBER,
  MAP_BOOLEAN_STRING_NUMBER,
  MAP_WITH_ARRAY,
  ARRAY_WITH_MAP,
};

describe('unit.app.api.aws.AwsClient', () => {
  afterEach(() => sinon.restore());

  describe('.constructor', () => {
    it('Creates a Fragment', () => {
      const { client } = getAwsClient();
      expect(client.constructor.name).toEqual('AwsClient');
    });
  });

  describe('.fromField', () => {
    Object.entries(fields).forEach(([key, field]) => {
      it(`Converts: ${key}`, () => {
        const { client } = getAwsClient();
        const from = field[0] as { [key: string]: any };
        const expected = field[1];

        expect(client.fromField(from)).toEqual(expected);
      });
    });
  });

  describe('.toField', () => {
    Object.entries(fields).forEach(([key, field]) => {
      it(`Converts: ${key}`, () => {
        const { client } = getAwsClient();
        const from = field[1];
        const expected = field[0];

        expect(client.toField(from)).toEqual(expected);
      });
    });
  });
});
