'use strict';

const expect = require('chai').expect;
const CONSTS = require('../lib');

describe('Fi Consts', function () {

  it('object should be a function', function () {
    expect(CONSTS).to.be.an('object');
  });

  it('should fail initialization if basedir is not present', function () {
    expect(CONSTS.load.bind(null)).to.throw(Error);
  });

  it('should fail initialization if basedir is not a string', function () {
    expect(CONSTS.load.bind(null, {
      basedir: 1234
    })).to.throw(Error);
  });

  it('should initialize properly if config is valid', function () {
    expect(CONSTS.load.bind(null, {
      basedir: __dirname + '/consts'
    })).to.not.throw(Error);

    expect(CONSTS).to.be.an('object');

    expect(CONSTS).to.not.be.empty;
    expect(CONSTS.ROLES).to.be.an('object');
    expect(CONSTS.ROLES.ADMIN).to.be.an('object');
    expect(CONSTS.ROLES.USER).to.be.an('object');
    expect(CONSTS.ROLES.ADMIN.SLUG).to.be.a('string');
    expect(CONSTS.ROLES.USER.SLUG).to.be.a('string');
    expect(CONSTS.ROLES.ADMIN.VALUE).to.be.a('string');
    expect(CONSTS.ROLES.USER.VALUE).to.be.a('string');
    expect(CONSTS.OTHER).to.be.an('object');
    expect(CONSTS.OTHER.VALUES).to.be.an('array');
    expect(CONSTS.OTHER.EMBEDDED).to.be.an('object');
    expect(CONSTS.OTHER.EMBEDDED.VALUES).to.be.an('object');
    expect(CONSTS.OTHER.EMBEDDED.VALUES.VALUE_1).to.be.an('object');
    expect(CONSTS.OTHER.EMBEDDED.VALUES.VALUE_2).to.be.an('object');
    expect(CONSTS.OTHER.EMBEDDED.VALUES.VALUE_1.ARRAY).to.be.an('array');
    expect(CONSTS.OTHER.EMBEDDED.VALUES.VALUE_2.ARRAY).to.be.an('array');
  });

});
