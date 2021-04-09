// @flow
/* eslint-env mocha */

import assert from 'power-assert'
import startOfYear from '.'

describe('startOfYear', function() {
  it('returns the date with the time set to 00:00:00 and the date set to the first day of a year', function() {
    const date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    const result = startOfYear(date)
    assert.deepEqual(result, new Date(2014, 0 /* Jan */, 1, 0, 0, 0, 0))
  })

  it('allows to specify which day is the first day of the year', function() {
    const date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    const result = startOfYear(date, { yearStartsOn: 1 })
    assert.deepEqual(result, new Date(2014, 1 /* Feb */, 1))
  })

  it('implicitly converts options', function() {
    const date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    // @ts-expect-error
    const result = startOfYear(date, { yearStartsOn: '1' })
    assert.deepEqual(result, new Date(2014, 1 /* Feb */, 1))
  })

  it('accepts a timestamp', function() {
    const date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0).getTime()
    const result = startOfYear(date)
    assert.deepEqual(result, new Date(2014, 0 /* Dec */, 1, 0, 0, 0, 0))
  })

  it('does not mutate the original date', function() {
    const date = new Date(2014, 8 /* Sep */, 2, 11, 55, 0)
    startOfYear(date)
    assert.deepEqual(date, new Date(2014, 8 /* Sep */, 2, 11, 55, 0))
  })

  it('handles dates before 100 AD', function() {
    const initialDate = new Date(0)
    initialDate.setFullYear(9, 0 /* Jan */, 5)
    initialDate.setHours(0, 0, 0, 0)
    const expectedResult = new Date(0)
    expectedResult.setFullYear(9, 0 /* Jan */, 1)
    expectedResult.setHours(0, 0, 0, 0)
    const result = startOfYear(initialDate)
    assert.deepEqual(result, expectedResult)
  })

  describe('edge cases', function() {
    describe('when the given day is before the start of a year', function() {
      it('it returns the start of a year', function() {
        const date = new Date(2014, 6 /* Jul */, 1)
        const result = startOfYear(date, { yearStartsOn: 8 })
        assert.deepEqual(result, new Date(2013, 8 /* Sep */, 1))
      })
    })

    describe('when the given day is the start of a year', function() {
      it('it returns the start of a year', function() {
        const date = new Date(2014, 8 /* Sep */, 1)
        const result = startOfYear(date, { yearStartsOn: 8 })
        assert.deepEqual(result, new Date(2014, 8 /* Sep */, 1))
      })
    })

    describe('when the given day is after the start of a year', function() {
      it('it returns the start of a year', function() {
        const date = new Date(2014, 10 /* Nov */, 1)
        const result = startOfYear(date, { yearStartsOn: 8 })
        assert.deepEqual(result, new Date(2014, 8 /* Sep */, 1))
      })
    })
  })

  it('returns `Invalid Date` if the given date is invalid', function() {
    const result = startOfYear(new Date(NaN))
    //@ts-expect-error
    assert(result instanceof Date && isNaN(result))
  })

  it('throws `RangeError` if `options.yearStartsOn` is not convertable to 0, 1, ..., 11 or undefined', function() {
    const block = () =>
      startOfYear(
        new Date(2014, 8 /* Sep */, 2, 11, 55, 0),
        // @ts-expect-error
        { yearStartsOn: NaN }
      )
    assert.throws(block, RangeError)
  })

  it('throws TypeError exception if passed less than 1 argument', function() {
    assert.throws(startOfYear.bind(null), TypeError)
  })
})
