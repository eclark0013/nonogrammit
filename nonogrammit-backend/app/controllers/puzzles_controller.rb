class PuzzlesController < ApplicationController
    
    def index
        puzzles = Puzzle.all
        render json: PuzzleSerializer.new(puzzles)
    end

    def show
        puzzle = Puzzle.find(params[:id])
        render json: PuzzleSerializer.new(puzzle)
    end

    def create
        puzzle = Puzzle.create
        puzzle.add_info
        puzzle.save
        puzzle = Puzzle.find(rand(1..puzzle.id-1))
        render json: PuzzleSerializer.new(puzzle)
    end
end
