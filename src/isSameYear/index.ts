import startOfYear from '../startOfYear'
import { YearStartOptions } from '../types'
import requiredArgs from '../_lib/requiredArgs/index'

/**
 * @name isSameYear
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @param {Object} [options] - an object with options.
 * @param {0|1|2|3|4|5|6|7|8|9|10|11} [options.yearStartsOn=0] - the index of the first month of the year (0 - January)
 * @returns {Boolean} the dates are in the same year
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * var result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * // If year starts with April, are 2 September 2014 and 25 September 2014 in the same year?
 * var result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25), { yearStartsOn: 3 })
 * //=> true
 */
export default function isSameYear(
  dirtyDateLeft: Date | number,
  dirtyDateRight: Date | number,
  dirtyOptions?: YearStartOptions
): boolean {
  requiredArgs(2, arguments)

  const dateLeft = startOfYear(dirtyDateLeft, dirtyOptions)
  const dateRight = startOfYear(dirtyDateRight, dirtyOptions)
  return dateLeft.getFullYear() === dateRight.getFullYear()
}
