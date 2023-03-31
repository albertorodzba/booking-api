
const validateUID = ( id ) => {
    return ( req, res, next ) => {
        const { uid } = req.uid;

        if( id === uid ) throw new Error(`Your user does not delete user with id = ${id} `)

    }
}

