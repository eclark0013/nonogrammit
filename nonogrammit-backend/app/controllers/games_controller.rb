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
        byebug
    end

end
