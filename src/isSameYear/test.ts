// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import isSameYear from '.'

describe('isSameYear', function () {
  it('returns true if the given dates have the same year', function () {
    const result = isSameYear(
      new Date(2014, 8 /* Sep */, 2),
      new Date(2014, 8 /* Sep */, 25)
    )
    assert(result === true)
  })

  it('returns false if the given dates have different years', function () {
    const result = isSameYear(
      new Date(2014, 8 /* Sep */, 2),
      new Date(2013, 8 /* Sep */, 25)
    )
    assert(result === false)
  })

  it('allows to specify which day is the first day of the year', function () {
    const result = isSameYear(
      new Date(2014, 7 /* Aug */, 31),
      new Date(2014, 8 /* Sep */, 4),
      { yearStartsOn: 1 }
    )
    assert(result === true)
  })

  it('implicitly converts options', function () {
    const result = isSameYear(
      new Date(2014, 7 /* Aug */, 31),
      new Date(2014, 8 /* Sep */, 4),
      // @ts-expect-error
      { yearStartsOn: '1' }
    )
    assert(result === true)
  })

  it('accepts a timestamp', function () {
    const result = isSameYear(
      new Date(2014, 8 /* Sep */, 2).getTime(),
      new Date(2014, 8 /* Sep */, 25).getTime()
    )
    assert(result === true)
  })

  it('returns false if the first date is `Invalid Date`', function () {
    const result = isSameYear(new Date(NaN), new Date(1989, 6 /* Jul */, 10))
    assert(result === false)
  })

  it('returns false if the second date is `Invalid Date`', function () {
    const result = isSameYear(new Date(1987, 1 /* Feb */, 11), new Date(NaN))
    assert(result === false)
  })

  it('returns false if the both dates are `Invalid Date`', function () {
    const result = isSameYear(new Date(NaN), new Date(NaN))
    assert(result === false)
  })

  it('throws `RangeError` if `options.yearStartsOn` is not convertable to 0, 1, ..., 11 or undefined', function () {
    const block = () =>
      isSameYear(
        new Date(2014, 7 /* Aug */, 31),
        new Date(2014, 8 /* Sep */, 4),
        // @ts-expect-error
        { yearStartsOn: NaN }
      )
    assert.throws(block, RangeError)
  })

  it('throws TypeError exception if passed less than 2 arguments', function () {
    assert.throws(isSameYear.bind(null), TypeError)
    assert.throws(isSameYear.bind(null, 1), TypeError)
  })
})
