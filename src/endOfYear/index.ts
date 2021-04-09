import toDate from '../toDate/index'
import { YearStartOptions } from '../types'
import requiredArgs from '../_lib/requiredArgs/index'
import toInteger from '../_lib/toInteger'

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {0|1|2|3|4|5|6|7|8|9|10|11} [options.yearStartsOn=0] - the index of the first month of the year (0 - January)
 * @returns {Date} the end of a year
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * var result = endOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 23:59:59.999
 *
 * // If the year starts on April, the end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 00), { yearStartsOn: 4 })
 * //=> Tue Mar 31 2015 23:59:59.999
 */
export default function endOfYear(
  dirtyDate: Date | number,
  dirtyOptions?: YearStartOptions
): Date {
  requiredArgs(1, arguments)

  const options = dirtyOptions || {}
  const yearStartsOn =
    options.yearStartsOn == null ? 0 : toInteger(options.yearStartsOn)

  // Test if yearStartsOn is between 0 and 11 _and_ is not NaN
  if (!(yearStartsOn >= 0 && yearStartsOn <= 11)) {
    throw new RangeError('yearStartsOn must be between 0 and 11 inclusively')
  }

  const cleanDate = toDate(dirtyDate)
  const year = cleanDate.getFullYear()
  const month = cleanDate.getMonth()

  const date = new Date(0)
  date.setFullYear(yearStartsOn > month ? year : year + 1, yearStartsOn)
  date.setHours(0, 0, 0, 0)
  date.setTime(date.getTime() - 1)
  return date
}
