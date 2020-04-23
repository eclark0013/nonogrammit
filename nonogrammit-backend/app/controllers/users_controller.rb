class UsersController < ApplicationController
    # before_action :require_login, only: [:show, :home]

    # def index
    #     @users = User.all
    # end

    # def show
    #     @user = User.find_by(id: params[:id])
    #     if @user == nil
    #         redirect_to root_path
    #     end
    # end

    # def home #root path
    #     redirect_to user_path(current_user)
    # end

    # def new #sign up page
    #     @user = User.new
    # end

    def create #make a new user
        user = User.new(username: user_params["username"])
        user.password = user_params["password"] #fix this clunkiness
        byebug
        # if @user.valid?
        #     session[:user_id] = @user.id
        #     redirect_to user_path(@user)
        # else
        #     flash.now[:error_messages] = @user.errors.full_messages
        #     render "new"
        # end
    end

    private
    def user_params
        params.require(:user).permit(:username, :password)
    end
end
