class Room {
    constructor(id)
    {
        this.id = id
        this.active = false
        this.clients = new Set
        this.losers = 0
        this.pieces = null
    }

    join(client)
    {
        return new Promise((resolve, reject) => {
            if (client.room)
                reject('Client already in room');
            else if ([...this.clients.values()].find(el => el.name === client.name))
                reject('duplicated Name')
            else {
                let len = this.clients.size
            
                if (len > 3)
                    reject('This room reached its limit of 4')
                else if (this.active)
                    reject('This room is mid Game wait until finish')
                else
                {
                    if (len === 0)
                        client.admin = true
                    this.clients.add(client);
                    client.room = this;
                    resolve('connection to room successful')
                }
            }
        })
    }

    leave(client)
    {
        this.clients.delete(client);
        client.room = null;
    }

    nextRoomAdmin()
    {
        if (this.clients.size > 0) {
            [...this.clients][0].admin = true
            return [...this.clients][0] 
        }
        return null
    }

    getRoomAdmin()
    {
        return [...this.clients].find(client => client.admin)
    }

    getClient(id)
    {
        return [...this.clients].find(client => client.id === id)
    }
}

module.exports = Room