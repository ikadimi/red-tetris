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

module.exports = {createId, getInfo}