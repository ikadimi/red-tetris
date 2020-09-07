const Tetris = require('./tetris').Tetris
const Board = require('./board')
const { soloPieces } = require('./helperFunctions')

class Client {
    constructor(socket, name)
    {
        this.socket = socket
        this.id = socket.id
        this.name = name
        this.room = null
        this.board = null
        this.pieces = null 
        this.pieceOrder = 0
        this.currentPiece = 0
        this.offset = {x: 4, y: 0, r: 0, leftOut: 0}
        this.score = 0
        this.lineCleared = 0
        this.admin = false
        this.lost = false
    }

    assignPieces()
    {
        if (this.room)
            this.pieces = this.room.pieces.nextPiece(this.id)
        else
            this.pieces = soloPieces() 
    }

    initialiseClient()
    {
        this.board = new Board(10, 20)
        this.assignPieces()
        this.currentPiece = this.pieces[0]
    }

    getInfo()
    {
        return {
            id: this.id,
            room: this.room.id,
            name: this.name,
            admin: this.admin,
            nextPiece: this.pieces[this.pieceOrder + 1],
            score: this.score,
            lineCleared: this.lineCleared 
        }
    }

    freezLines(lines)
    {
        if (this.board && this.room && this.offset.leftOut < 20)
        {
            this.offset.leftOut += lines
            if (this.offset.leftOut > 19)
                this.offset.leftOut = 20
            this.board.freezLines(this.offset.leftOut)
            const board = this.board.getBoard()
            this.socket.broadcast.to(this.room.id).emit('boardUpdated', {
                roomId: this.room.id,
                id: this.id,
                board
            })
            return board
        }
        return null
    }

    restartGame()
    {
        this.board.clearBoard()
        this.assignPieces()
        this.pieceOrder = 0
        this.currentPiece = this.pieces[0]
        this.score = 0
        this.lineCleared = 0
        this.offset = {x: 4, y: 0, r: 0, leftOut: 0}
        this.socket.emit('pieceChange', this.pieces[this.pieceOrder + 1])
        this.socket.emit('updateScore', {score: 0, lineCleared: 0})
        if (this.room) {
            this.room.restartRoom()
            this.socket.broadcast.to(this.room.id).emit('infoUpdated', {info: this.getInfo()})
        }
    }

    gameOver()
    {
        if (this.room) {
            this.socket.emit('gameLost')
            this.lost = true
            let losers = this.room.playerLost()
            if ((losers >= this.room.clients.size) ||
                ((losers + 1) === this.room.clients.size)) {
                this.room.active = false
                this.socket.emit('gameOver')
                this.socket.broadcast.to(this.room.id).emit('gameOver')
            }
        }
        else
            this.socket.emit('gameOver') 
    }

    resetOffset()
    {
        return {x: 4, y: 0, r: 0, leftOut: 0}
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

    pieceEnd()
    {
        if (this.board && this.room) {
            this.board.finalPosition(this.offset.leftOut)
            const {score, lineCleared} = this.board.lineComplete(this.offset.leftOut)
    
            if (score > 0) {
                this.score += score
                this.lineCleared += lineCleared
                this.socket.emit('updateScore', {score: this.score, lineCleared: this.lineCleared})
            }
            if (this.pieceOrder < 5) {
                this.pieceOrder++
                this.currentPiece = this.pieces[this.pieceOrder]
            }
            else {
                this.currentPiece = this.pieces[6]
                this.assignPieces()
                this.pieceOrder = -1
            }
            if (this.room)
                this.socket.broadcast.to(this.room.id).emit('infoUpdated', {info: this.getInfo()}) 
            this.socket.emit('pieceChange', this.pieces[this.pieceOrder + 1])
            this.offset.x = 4; this.offset.y = 0; this.offset.r = 0
            if (!this.board.detecteCollision(Tetris[this.currentPiece][this.offset.r], {x: 4, y: 1, leftOut: this.offset.leftOut}))
                this.gameOver()
        }
    }

    newBoard(piece)
    {
        this.board.deleteTetris(this.offset.leftOut)
        this.dropVisualisation()
        this.board.moveTetris(piece, this.offset)
        const board = this.board.getBoard()
        if (this.room)
            this.socket.broadcast.to(this.room.id).emit('boardUpdated', {roomId: this.room.id, id: this.id, board})
        return board
    }

    moveDown()
    {
        if (this.pieces && this.board)
        {
            let {x, y, r, leftOut} = this.offset
            const piece = Tetris[this.currentPiece][r]

            if (this.board.detecteCollision(piece, {x, leftOut, y: y + 1}))
            {
                this.offset.y += 1
                return this.newBoard(piece)
            }
            else {
                this.pieceEnd()
            }
        }
        return null
    }

    moveRight()
    {
        let {x, y, r, leftOut} = this.offset
        const piece = Tetris[this.currentPiece][r]

        if (this.board && piece && (x + piece[0].length) < 10)
        {
            if (this.board.detecteCollision(piece, {x: x + 1, y, leftOut}))
            {
                this.offset.x += 1
                return this.newBoard(piece) 
            }
        }
    }
    
    moveLeft()
    {
        let {x, y, r, leftOut} = this.offset
        const piece = Tetris[this.currentPiece][r]

        if (this.board && piece && x > 0)
        {
            if (this.board.detecteCollision(piece, {x: x - 1, y, leftOut}))
            {
                this.offset.x += -1
                return this.newBoard(piece)
            }
        }
    }

    checkRotation()
    {
        let len;
        let r = this.offset.r;
        const piece = Tetris[this.currentPiece]

        if (piece && this.board)
        {
            r++;
            if (r >= piece.length)
                r = 0;
            if (!this.board.detecteCollision(piece[r], this.offset))
            {
                if (r == 0)
                    r = piece.length;
                r--;
            }
            this.offset.r = r;
            len = piece[r][0].length;
            if (len + this.offset.x > 9)
            {
                this.offset.x = 10 - len;
            }
            return this.newBoard(piece[r])
        }
        return null
    }

    dropPiece()
    {
        const piece = Tetris[this.currentPiece][this.offset.r]

        if (piece && this.board)
        {
            let tmpY = this.board.verticalEnd(piece, this.offset)
            if (tmpY > this.offset.y) {
                this.offset.y = tmpY
                this.newBoard(piece)
                this.pieceEnd()
                return this.board.getBoard()
            }
        }
        return null
    }

    dropVisualisation()
    {
        const piece = Tetris[this.currentPiece][this.offset.r]

        if (piece && this.board)
        {
            let tmpY = this.board.verticalEnd(piece, this.offset)
            if (tmpY > this.offset.y)
                return this.board.drawVisualisation(tmpY, this.offset.x, piece)
        }
        return null
    }
}

module.exports = Client;