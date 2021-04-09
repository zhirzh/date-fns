// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import endOfYear from '.'

describe('endOfYear', function() {
  it('returns the date with the time set to 23:59:59.999 and the date set to the last day of a year', function() {
    const date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    const result = endOfYear(date)
    assert.deepEqual(result, new Date(2014, 11 /* Dec */, 31, 23, 59, 59, 999))
  })

  it('allows to specify which day is the first day of the year', function() {
    var date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    var result = endOfYear(date, { yearStartsOn: 1 })
    assert.deepStrictEqual(
      result,
      new Date(2015, 0 /* Jan */, 31, 23, 59, 59, 999)
    )
  })

  it('implicitly converts options', function() {
    var date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    // @ts-expect-error
    var result = endOfYear(date, { yearStartsOn: '1' })
    assert.deepStrictEqual(
      result,
      new Date(2015, 0 /* Jan */, 31, 23, 59, 59, 999)
    )
  })

  it('accepts a timestamp', function() {
    const date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0).getTime()
    const result = endOfYear(date)
    assert.deepEqual(result, new Date(2014, 11 /* Dec */, 31, 23, 59, 59, 999))
  })

  it('does not mutate the original date', function() {
    const date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    endOfYear(date)
    assert.deepEqual(date, new Date(2014, 8 /* Sep */, 2, 11, 55, 0))
  })

  describe('edge cases', function() {
    describe('when the given day is before the start of a year', function() {
      it('it returns the start of a year', function() {
        const date = new Date(2014, 6 /* Jul */, 1)
        const result = endOfYear(date, { yearStartsOn: 8 })
        assert.deepEqual(
          result,
          new Date(2014, 7 /* Aug */, 31, 23, 59, 59, 999)
        )
      })
    })

    describe('when the given day is the start of a year', function() {
      it('it returns the start of a year', function() {
        const date = new Date(2014, 8 /* Sep */, 1)
        const result = endOfYear(date, { yearStartsOn: 8 })
        assert.deepEqual(
          result,
          new Date(2015, 7 /* Aug */, 31, 23, 59, 59, 999)
        )
      })
    })

    describe('when the given day is after the start of a year', function() {
      it('it returns the start of a year', function() {
        const date = new Date(2014, 10 /* Nov */, 1)
        const result = endOfYear(date, { yearStartsOn: 8 })
        assert.deepEqual(
          result,
          new Date(2015, 7 /* Aug */, 31, 23, 59, 59, 999)
        )
      })
    })
  })

  it('returns `Invalid Date` if the given date is invalid', function() {
    const result = endOfYear(new Date(NaN))
    //@ts-expect-error
    assert(result instanceof Date && isNaN(result))
  })

  it('throws `RangeError` if `options.yearStartsOn` is not convertable to 0, 1, ..., 11 or undefined', function() {
    // @ts-expect-error
    var block = endOfYear.bind(
      null,
      new Date(2014, 8 /* Sep */, 2, 11, 55, 0),
      // $ExpectedMistake
      { yearStartsOn: NaN }
    )
    assert.throws(block, RangeError)
  })

  it('throws TypeError exception if passed less than 1 argument', function() {
    assert.throws(endOfYear.bind(null), TypeError)
  })
})
