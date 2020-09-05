function createId(len = 6, chars = 'abcdefghjkmnopqrstwxyz0123456789')
{
    let id = '';
    while (len--)
    {
        id += chars[Math.random() * chars.length | 0];
    }
    return id;
}

const getInfo = (client) => {
    return {
        id: client.id,
        room: client.room.id,
        name: client.name,
        admin: client.admin,
        score: 0,
        lineCleared: 0,
        nextPiece: client.pieces[1]
    }
}

const shuffle = (arr) => {
    let n
    let tmp

    for (let i = arr.length - 1; i > 0; i--)
    {  
        n = Math.floor(Math.random() * (i + 1))
        tmp = arr[i]
        arr[i] = arr[n]
        arr[n] = tmp
    }
}

const soloPieces = () => {
    let pieceOrder = [0, 1, 2, 3, 4, 5, 6]
    this.shuffle(pieceOrder)
    return pieceOrder 
}

module.exports = {createId, getInfo, soloPieces}