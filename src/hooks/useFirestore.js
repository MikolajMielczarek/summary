import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING': 
            return { isPending: true, document: null, success: false, error: null }
        case 'ERROR': 
            return { isPending: false, document: null, success: false, error: action.payload }
        case 'ADDED_DOCUMENT': 
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT': 
            return { isPending: false, document: null, success: true, error: null }
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    //response - kind of this what we get from firestore
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const ref = projectFirestore.collection(collection)

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action => {
        if (!isCancelled) {
            dispatch(action)
        }
    })

    //add document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            //new firebase timestamp stored in createdAt with actual Date when we add doc
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({ ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    //delete document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
        }
    }

    //edit document
    const editDocument = async (id, doc) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            console.log('try')
            const lastEdit = timestamp.fromDate(new Date());
            console.log(id)
            console.log(doc)
            const editedDocument = await ref.doc(id).set({ ...doc, lastEdit });
            console.log(editedDocument)
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: editedDocument });
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message });
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { addDocument, deleteDocument, editDocument, response }
}