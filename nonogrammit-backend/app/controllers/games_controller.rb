class GamesController < ApplicationController
    def show
        game = Game.find(params[:id])
        render json: GameSerializer.new(game)
    end

    def create
        game = Game.create(user_id: params[:user_id], puzzle_id: params[:puzzle_id])
        render json: GameSerializer.new(game)
    end

    def update
        game = Game.find_or_create_by(puzzle_id: params[:puzzle][:id], user_id: params[:user][:id])
        game.update(time: params[:time])
        byebug
        render json: GameSerializer.new(game)
    end

end
