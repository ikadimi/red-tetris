class Pieces {
    constructor(size = 4)
    {
        this.pieceStack = []
        this.roomSize = size
    }

    shuffle(arr)
    {
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

    restartStack()
    {
        this.pieceStack = []
    }

    addNewPieces(id)
    {
        let pieceOrder = [0, 1, 2, 3, 4, 5, 6]
        this.shuffle(pieceOrder)
        let newPile = {pieces: pieceOrder, users: new Set} 

        newPile.users.add(id)
        this.pieceStack.push(newPile)
        return newPile.pieces
    }

    nextPiece(id)
    {
        let i = 0

        while (i < this.pieceStack.length)
        {
            if (!this.pieceStack[i].users.has(id))
            {
                this.pieceStack[i].users.add(id)
                if (this.pieceStack[i].users.size >= this.roomSize)
                    return this.pieceStack.splice(i, 1)[0].pieces
                else
                    return this.pieceStack[i].pieces
            }
            i++;
        }
        return this.addNewPieces(id);
    }
}

module.exports = Pieces