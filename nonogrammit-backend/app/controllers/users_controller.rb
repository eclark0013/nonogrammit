class UsersController < ApplicationController
    # before_action :require_login, only: [:show, :home]

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user)
    end

    def edit
        raise "edit".inspect
    end

    def update
        user = User.find(params[:id])
        user.current_puzzle = params[:current_puzzle]
        user.save
        render json: UserSerializer.new(user)
    end

    def create #make a new user
        user = User.new(username: user_params["username"])
        user.password = params["password"] #fix this clunkiness
        user.save
        if user.valid?
            render json: user
        else
            render json: {message: "Invalid entry."}
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password, current_puzzle: [:id, :shaded])
    end
end
