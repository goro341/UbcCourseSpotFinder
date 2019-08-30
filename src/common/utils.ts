import * as momentJalali from 'moment-jalaali';
import * as jsdom from 'jsdom';
import {SwalError} from './interfaces';
import Swal from 'sweetalert2';


momentJalali.loadPersian({dialect: 'persian-modern'});

const convertHTMLCollectionToList = (htmlCollection) => {
    const list = [];
    for (const item of htmlCollection) {
        list.push(item);
    }
    return list;
};

const flattenArray = (inputArray: any[]) => [].concat.apply([], inputArray);


const getDom = (htmlContent: string): Document => {
    const { JSDOM } = jsdom;
    const window = new JSDOM().window;
    const parser = new window.DOMParser();
    return parser.parseFromString(htmlContent, 'text/html');
};

const produceUrl = (uri: string, queryParams: {}) => {
    return `${encodeURI(uri)}?${Object.keys(queryParams)
        .map(key => `${key}=${queryParams[key]}`).join('&')}`;
};

class DateTimeUtil {
    static toJalaaliDate(date: Date | string, format: string = 'jYYYY-jMM-jDD') {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return momentJalali(date).format(format);
    }

    static getTodayJalaali(offset: number = 0) {
        return momentJalali(new Date()).add(offset, 'days').format('jYYYY-jMM-jDD');
    }

    /**
     *
     * @param firstDate Jalali Date in format YYYY/MM/dd
     * @param secondDate Jalali Date in format YYYY/MM/dd
     */
    static getDateDifference(firstDate: string, secondDate: string) {
        const firstJalaliDate = momentJalali(firstDate.split('/'));
        const secondJalaliDate = momentJalali(secondDate.split('/'));
        return Math.abs(firstJalaliDate.diff(secondJalaliDate, 'days'));
    }

    static addDays(shamsiDate: string, numDays: number) {
        const resultDate = new Date(this.toGregorian(shamsiDate));
        resultDate.setDate(resultDate.getDate() + numDays);
        return this.toJalaaliDate(resultDate);
    }

    /**
     *
     * @param shamsiDate date in format YYYY/MM/dd
     */
    static toGregorian(shamsiDate: string) {
        return momentJalali(shamsiDate, 'jYYYY/jM/jD').format('YYYY/MM/DD');
    }

    /**
     *
     * @param dateString example: '2019-07-01T00:00:00'
     */
    static getDateFromString(dateString: string) {
        const dateObject = new Date(dateString);
        const dd = String(dateObject.getDate()).padStart(2, '0');
        const mm = String(dateObject.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = dateObject.getFullYear();
        return [yyyy, mm, dd].join('-');
    }

    /**
     *
     * @param fromDate format shamsi: YYYY/MM/dd
     * @param toDate format shamsi: YYYY/MM/dd
     * @param interval number
     */
    static getDateRanges(fromDate: string, toDate: string, interval: number) {
        fromDate = fromDate.split('/').join('-');
        toDate = toDate.split('/').join('-');
        if (fromDate >= toDate) {
            return [];
        } else {
            const finalResult = [];
            let lowerBound = fromDate;
            let upperBound = this.addDays(fromDate, interval);
            while (upperBound <= toDate) {
                finalResult.push([lowerBound.split('-').join('/'), upperBound.split('-').join('/')]);
                lowerBound = upperBound;
                upperBound = this.addDays(upperBound, interval);
            }
            if (upperBound > toDate && lowerBound < toDate) {
                finalResult.push([lowerBound.split('-').join('/'), toDate.split('-').join('/')]);
            }
            return finalResult;
        }
    }

    static dashToSlash(dateString: string) {
        return dateString.split('-').join('/');
    }

    static slashToDash(dateString: string) {
        return dateString.split('/').join('-');
    }
}

const swalError = (error: SwalError, returnButtonText: string) => {
    return Swal.fire({
        type: 'error',
        title: error.message,
        text: error.solution,
        confirmButtonText: returnButtonText
    });
};

export {swalError, getDom, DateTimeUtil, flattenArray, produceUrl, convertHTMLCollectionToList};
