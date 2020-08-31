class Board {
    constructor(width, height)
    {
        this.width = width
        this.height = height
        this.board = new Array(height)

        for (let i = 0; i < height; i++) {
            this.board[i] = new Array(width).fill('0')
        }
    }

    getBoard()
    {
        return this.board;
    }

    clearBoard()
    {
        for (let i = 0; i < this.height; i++) {
            this.board[i].fill('0')
        }
    }

    freezLines(leftOut)
    {
        for (let i = 0; i < leftOut; i++)
            this.board[this.height - i - 1].fill('9')
    }

    detecteCollision(piece, offset)
    {
        if (!piece || offset.x < 0 || offset.x > 10 || offset.y < 0 || offset.y > 19
           || offset.leftOut < 0 || offset.leftOut > 19)
            return false
        for (let i = 0; i < piece.length; i++)
        {
            for (let j = 0; j < piece[i].length; j++)
            {
                if (piece[i][j] !== '0')
                {
                    if ((i + offset.y) >= 20 - offset.leftOut)
                        return false;
                    else if (parseInt(this.board[i + offset.y][j + offset.x]) > 0)
                       return false;
                }
            }
        }
        return true;
    }

    lineComplete(leftOut)
    {
        let line
        let score = 0
        let lineCleared = 0

        for (let i = 19 - leftOut; i >= 0; i--)
        {
            line = 0
            for (let j = 0; j < this.width; j++)
            {
                if (parseInt(this.board[i][j]) > 0 && this.board[i][j] !== '9')
                    line++
                if (line == this.width)
                {
                    let row = this.board.splice(i, 1)[0].fill('0')
                    this.board.unshift(row)
                    lineCleared++
                    score += (10 * lineCleared)
                    i++
                }
            }
        }
        return ({score, lineCleared})
    }

    finalPosition(leftOut)
    {
        for (let i = 0; i < this.height - leftOut; i++)
        {
            for (let j = 0; j < this.width; j++)
            {
                if (parseInt(this.board[i][j]) < 0)
                {
                    this.board[i][j] = this.board[i][j].substring(1);
                }
            }
        }
    }

    deleteTetris(leftOut)
    {
        for (let i = 0; i < this.height - leftOut; i++)
        {
            for (let j = 0; j < this.width; j++)
            {
                if (parseInt(this.board[i][j]) < 0 || this.board[i][j] === 'v')
                    this.board[i][j] = '0';
            }
        }
    }

    startOffset(piece)
    {
        let x1 = -1;
        for (let i = 0; i < piece.length; i++)
        {
            for (let j = 0; j < piece[i].length; j++)
            {
                if (piece[i][j] !== '0') {
                    if (x1 === -1 || x1 > j)
                        x1 = j;
                }
            }
        }
        return (x1);
    }

    moveTetris(piece, offset)
    {
        if (offset.y < 0 || offset.x < 0 || !piece)
            return ;
        for (let i = 0; i < piece.length; i++)
        {
            for (let j = 0; j < piece[i].length; j++)
            {
                if (piece[i][j] !== '0') {
                    this.board[i + offset.y][j + offset.x] = piece[i][j];
                }
            }
        }
    }

    drawVisualisation(y, x, piece)
    {
        for (let i = piece.length - 1; i >= 0; i--)
        {
            for (let j = 0; j < piece[i].length; j++)
            {
                if (piece[i][j] != '0')
                    this.board[y + i][x + j] = 'v';
            }
        }
        return this.board
    }

    verticalEnd(piece, offset)
    {
        for (let y = offset.y; y <= this.height - offset.leftOut; y++)
        {
            if (!this.detecteCollision(piece, {x: offset.x, y: y, leftOut: offset.leftOut}))
                return y - 1
        }
        return offset.y
    }
}

module.exports = Board