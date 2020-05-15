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
        new_puzzle = Puzzle.create
        new_puzzle.add_info
        new_puzzle.save
        # fetched_puzzle = Puzzle.find(rand(1..Puzzle.all.size))
        # render json: PuzzleSerializer.new(fetched_puzzle)
        render json: PuzzleSerializer.new(new_puzzle)
    end
end
