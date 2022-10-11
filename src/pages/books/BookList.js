import React, { useEffect, useState } from 'react'
import produce from 'immer'
import Filter from '../../assets/filter-solid.svg'
import Edit from '../../assets/pen-to-square-solid.svg'
import { useFirestore } from '../../hooks/useFirestore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

export default function BookList({ books, dateFromTimestamp }) {
    
    const { deleteDocument } = useFirestore('books')

    const [valuesFilters, setValuesFilters] = useState([{name:'bookTitle', state:'start'},{name:'bookAuthor', state:'start'},{name:'bookStarRecomendation', state:'start'},{name:'bookStarAfter', state:'start'},{name:'createdAt', state:'start'}])

    const [booksToRead, setBooksToRead] = useState(null)
    const [booksAlreadyRead, setBooksAlreadyRead] = useState(null)
    
    useEffect(()=> {
        if(books){
            setBooksToRead(books.filter((book) => {
                return book.bookRead === false
            }))
            setBooksAlreadyRead(books.filter((book) => {
                return book.bookRead === true
            }))
        }
    },[books])

    if (books.length === 0) {
        return <div className="error">No books to load...</div>
    }

    // const dateFromTimestamp = (time) => {
    //     let dataToDisplay = [];
    //     const timestampForDate = time.toDate();
    //     dataToDisplay[0] = [timestampForDate.getFullYear()];
    //     let month = timestampForDate.getMonth();
    //     let day = timestampForDate.getUTCDate();
        
    //     if(month < 10){
    //         dataToDisplay[1] = [`0${month}`]
    //     }else{
    //         dataToDisplay[1] = [month]
    //     }
    //     if(day < 10){
    //         dataToDisplay[2] = [`0${day}`]
    //     }else{
    //         dataToDisplay[2] = [day]
    //     }
    //     const timeDisplay = `${dataToDisplay[2]}.${dataToDisplay[1]}.${dataToDisplay[0]}`;
    //     return timeDisplay;
    // }

    const filterBooksToRead = (value, state, data) => {
        const dataCopy = produce(data, (draft) => {
            draft.sort((a,b) => {
                if(value === 'createdAt'){
                    if(state === 'start' || state ==='reverse'){
                        if(a[value].toDate() < b[value].toDate()){
                            return -1;
                        }
                        return 0;
                    }else{
                        if(a[value].toDate() > b[value].toDate()){
                            return -1;
                        }
                        return 0;
                    }
                }else{
                    if(state === 'start' || state ==='reverse'){
                        if(a[value].toLowerCase() < b[value].toLowerCase()){
                            return -1;
                        }
                        return 0;
                    }else{
                        if(a[value].toLowerCase() > b[value].toLowerCase()){
                            return -1;
                        }
                        return 0;
                    }
                }   
            })
        })
        if(data === booksToRead){
            setBooksToRead(dataCopy)
        }else{
            setBooksAlreadyRead(dataCopy)
        }
        console.log(dataCopy)
    }

    const filterList = (value, data) => {
        const newFilters = produce(valuesFilters, (draft) => {
            draft.forEach((filter)=> {
                if(filter.name === value){
                    if(filter.state === 'start' || filter.state ==='reverse'){
                        filterBooksToRead(value, filter.state, data)
                        filter.state = 'normal'
                    }else{
                        filterBooksToRead(value, filter.state, data)
                        filter.state = 'reverse'
                    }
                }else{
                    filter.state = 'start'
                }
            })
        })
        setValuesFilters(newFilters)
    }

    return (
    <section className='books__table table'>
        <aside className='table__container'>
            <h2 className='table__header'>Books to read - table</h2>
            <table className='table__table'>
                <thead className='table__table-thead'>
                    <tr className='table__table-thead-headers'>
                        <th className='table__table-thead-headers-header'>
                            <p className='table__table-thead-headers-header-txt'>Title</p>
                            <img
                                className='table__table-thead-headers-header-icon'
                                onClick={() => filterList('bookTitle', booksToRead)}
                                src={Filter} alt="filter icon"
                            />
                        </th>
                        <th className='table__table-thead-headers-header'>
                            <p className='table__table-thead-headers-header-txt'>Author</p>
                            <img
                                className='table__table-thead-headers-header-icon'
                                onClick={() => filterList('bookAuthor', booksToRead)}
                                src={Filter} alt="filter icon"
                            />
                        </th>
                        <th className='table__table-thead-headers-header'>
                            <p className='table__table-thead-headers-header-txt'>Recomendation Stars</p>
                            <img
                                className='table__table-thead-headers-header-icon'
                                onClick={() => filterList('bookStarRecomendation', booksToRead)}
                                src={Filter} alt="filter icon"
                            />
                        </th>
                        <th className='table__table-thead-headers-header'>
                            <p className='table__table-thead-headers-header-txt'>Date</p>
                            <img
                                className='table__table-thead-headers-header-icon'
                                onClick={() => filterList('createdAt', booksToRead)}
                                src={Filter} alt="filter icon"
                            />
                        </th>
                        <th className='table__table-thead-headers-txt'>Edit</th>
                    </tr>
                </thead>
                <tbody className='table__table-tbody'>
                    {booksToRead && booksToRead.map(book => (
                        <tr key={book.id} className='table__table-tbody-card'>
                            <td className='table__table-tbody-card-txt'>{book.bookTitle}</td>
                            <td className='table__table-tbody-card-txt'>{book.bookAuthor}</td>
                            <td className='table__table-tbody-card-txt'>{book.bookStarRecomendation}</td>
                            <td className='table__table-tbody-card-txt'>{dateFromTimestamp(book.createdAt)}</td>
                            <td className='table__table-tbody-card-edit'>
                                <NavLink className='table__table-tbody-card-edit-link' to={book.id}>
                                    <img
                                        className='table__table-tbody-card-edit-link-img'
                                        src={Edit} alt="edit icon"
                                    />
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </aside>
        <aside className='table__container'>
            <h2 className='table__header'>Books already read - table</h2>
            <table className='table__table'>
                <thead className='table__table-thead'>
                <tr className='table__table-thead-headers'>
                        <th className='table__table-thead-headers-header'>
                            <p className='table__table-thead-headers-header-txt'>Title</p>
                            <img
                                className='table__table-thead-headers-header-icon'
                                onClick={() => filterList('bookTitle',booksAlreadyRead)}
                                src={Filter} alt="filter icon"
                            />
                        </th>
                        <th className='table__table-thead-headers-header'>
                            <p className='table__table-thead-headers-header-txt'>Author</p>
                            <img
                                className='table__table-thead-headers-header-icon'
                                onClick={() => filterList('bookAuthor', booksAlreadyRead)}
                                src={Filter} alt="filter icon"
                            />
                        </th>
                        <th className='table__table-thead-headers-header'>
                            <p className='table__table-thead-headers-header-txt'>After Read Stars</p>
                            <img
                                className='table__table-thead-headers-header-icon'
                                onClick={() => filterList('bookStarAfter', booksAlreadyRead)}
                                src={Filter} alt="filter icon"
                            />
                        </th>
                        <th className='table__table-thead-headers-header'>
                            <p className='table__table-thead-headers-header-txt'>Date</p>
                            <img
                                className='table__table-thead-headers-header-icon'
                                onClick={() => filterList('createdAt', booksAlreadyRead)}
                                src={Filter} alt="filter icon"
                            />
                        </th>
                        <th className='table__table-thead-headers-txt'>Edit</th>
                    </tr>
                </thead>
                <tbody className='table__table-tbody'>
                    {booksAlreadyRead && booksAlreadyRead.map(book => (
                        <tr key={book.id} className='table__table-tbody-card'>
                            <td
                            className='table__table-tbody-card-txt'>{book.bookTitle}</td>
                            <td className='table__table-tbody-card-txt'>{book.bookAuthor}</td>
                            <td className='table__table-tbody-card-txt'>{book.bookStarAfter}</td>
                            <td className='table__table-tbody-card-txt'>{dateFromTimestamp(book.createdAt)}</td>
                            <td className='table__table-tbody-card-edit'>
                                <NavLink className='table__table-tbody-card-edit-link' to={book.id}>
                                    <img
                                        className='table__table-tbody-card-edit-link-img'
                                        src={Edit} alt="delete icon"
                                    />
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </aside>
    </section>
    )
}


// const filterToRead = (value) => {
//     if(counterFilterClick === 0){
//         setValueInFilter(value)
//         setCounterFilterClick(1)
//         setValueFilterDirection(true)
//         const filterToReadCopy = produce(booksFilterToRead, (draft) => {
//             draft.sort((a,b) => {
//                 if(a[value].toLowerCase() < b[value].toLowerCase()){
//                     return -1;
//                 }else if(a[value].toLowerCase() > b[value].toLowerCase()) {
//                     return 1;
//                 }
//                 return 0;
//             })
//             return draft;
//         })
//         setBooksFilterToRead(filterToReadCopy)
//     }else if(counterFilterClick === 0 && valueInFilter === value){
//         setValueInFilter(value)
//         setCounterFilterClick(1)
//         setValueFilterDirection(false)
//         const filterToReadCopy = produce(booksFilterToRead, (draft) => {
//             draft.sort((a,b) => {
//                 if(a[value].toLowerCase() > b[value].toLowerCase()){
//                     return -1;
//                 }else if(a[value].toLowerCase() < b[value].toLowerCase()) {
//                     return 1;
//                 }
//                 return 0;
//             })
//             return draft;
//         })
//         setBooksFilterToRead(filterToReadCopy)
//     }else if(counterFilterClick === 1 && valueInFilter === value && valueFilterDirection ===true){
//         setCounterFilterClick(2)
//         setValueInFilter(value)
//         setValueFilterDirection(false)
//         const filterToReadCopy = produce(booksFilterToRead, (draft) => {
//             draft.sort((a,b) => {
//                 if(a[value].toLowerCase() > b[value].toLowerCase()){
//                     return -1;
//                 }else if(a[value].toLowerCase() < b[value].toLowerCase()) {
//                     return 1;
//                 }
//                 return 0;
//             })
//             return draft;
//         })
//         setBooksFilterToRead(filterToReadCopy)
//     }else if(counterFilterClick === 1 && valueInFilter === value && valueFilterDirection === false){
//         setCounterFilterClick(2)
//         setValueInFilter(value)
//         setValueFilterDirection(true)
//         const filterToReadCopy = produce(booksFilterToRead, (draft) => {
//             draft.sort((a,b) => {
//                 if(a[value].toLowerCase() < b[value].toLowerCase()){
//                     return -1;
//                 }else if(a[value].toLowerCase() > b[value].toLowerCase()) {
//                     return 1;
//                 }
//                 return 0;
//             })
//             return draft;
//         })
//         setBooksFilterToRead(filterToReadCopy)
//     }else if(counterFilterClick === 2 && valueInFilter === value){
//         setCounterFilterClick(0)
//         setValueInFilter(value)
//         setValueFilterDirection(true)
//         const filterToReadCopy = produce(booksFilterToRead, (draft) => {
//             draft.sort((a,b) => {
//                 if(a[value].toLowerCase() < b[value].toLowerCase()){
//                     return -1;
//                 }else if(a[value].toLowerCase() > b[value].toLowerCase()) {
//                     return 1;
//                 }
//                 return 0;
//             })
//             return draft;
//         })
//         setBooksFilterToRead(filterToReadCopy)
//     } else{
//         if(valueFilterDirection === true){
//             setCounterFilterClick(1)
//             setValueInFilter(value)
//             setValueFilterDirection(false)
//             const filterToReadCopy = produce(booksFilterToRead, (draft) => {
//                 draft.sort((a,b) => {
//                     if(a[value].toLowerCase() > b[value].toLowerCase()){
//                         return -1;
//                     }else if(a[value].toLowerCase() < b[value].toLowerCase()) {
//                         return 1;
//                     }
//                     return 0;
//                 })
//                 return draft;
//             })
//             setBooksFilterToRead(filterToReadCopy)
//         }else{
//             setCounterFilterClick(1)
//             setValueInFilter(value)
//             setValueFilterDirection(true)
//             const filterToReadCopy = produce(booksFilterToRead, (draft) => {
//                 draft.sort((a,b) => {
//                     if(a[value].toLowerCase() < b[value].toLowerCase()){
//                         return -1;
//                     }else if(a[value].toLowerCase() > b[value].toLowerCase()) {
//                         return 1;
//                     }
//                     return 0;
//                 })
//                 return draft;
//             })
//             setBooksFilterToRead(filterToReadCopy)
//             }
//     }
    
//     console.log(value)
//     console.log(counterFilterClick)
// }


// const filterToRead = (value) => {

//     if(valueInFilter !== value){
//         setValueFilterDirection('normal')
//         setCounterFilterClick(0)
//     }

//     if(counterFilterClick === 0){
//         setValueInFilter(value)
//         setCounterFilterClick(1)
//         if(valueFilterDirection === 'normal' || valueFilterDirection === 'sortReverse') {
//             setValueFilterDirection('sortRight')
//             const filterToReadCopy = filterInisdeFilterFunction(booksFilterToRead,valueFilterDirection,value);
//             setBooksFilterToRead(filterToReadCopy)
//         }else {
//             setValueFilterDirection('sortReverse')
//             const filterToReadCopy = filterInisdeFilterFunction(booksFilterToRead,valueFilterDirection,value);
//             setBooksFilterToRead(filterToReadCopy)
//         }
//     }
//     if(counterFilterClick === 1){
//         setValueInFilter(value)
//         setCounterFilterClick(2)
//         if(valueFilterDirection === 'normal' || valueFilterDirection === 'sortReverse') {
//             setValueFilterDirection('sortRight')
//             const filterToReadCopy = filterInisdeFilterFunction(booksFilterToRead,valueFilterDirection,value);
//             setBooksFilterToRead(filterToReadCopy)
//         }else {
//             setValueFilterDirection('sortReverse')
//             const filterToReadCopy = filterInisdeFilterFunction(booksFilterToRead,valueFilterDirection,value);
//             setBooksFilterToRead(filterToReadCopy)
//         }
//     }
//     if(counterFilterClick === 2){
//         setValueInFilter(value)
//         setCounterFilterClick(0)
//         if(valueFilterDirection === 'normal' || valueFilterDirection === 'sortReverse') {
//             setValueFilterDirection('sortRight')
//             const filterToReadCopy = filterInisdeFilterFunction(booksFilterToRead,valueFilterDirection,value);
//             setBooksFilterToRead(filterToReadCopy)
//         }else {
//             setValueFilterDirection('sortReverse')
//             const filterToReadCopy = filterInisdeFilterFunction(booksFilterToRead,valueFilterDirection,value);
//             setBooksFilterToRead(filterToReadCopy)
//         }
//     }
    
//     console.log(value)
//     console.log(counterFilterClick)
// }



{/* <img
                                        className='table__table-tbody-card-delete-img'
                                        onClick={() => deleteDocument(book.id)}
                                        src={Trashcan} alt="delete icon"
                                    /> */}