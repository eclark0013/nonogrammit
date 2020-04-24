class PuzzlesController < ApplicationController
    
    def index
        puzzles = Puzzle.all
        render json: PuzzleSerializer.new(puzzles)
    end

    def show
        puzzle = Puzzle.find(params[:id])
        render json: PuzzleSerializer.new(puzzle)
    end
end
