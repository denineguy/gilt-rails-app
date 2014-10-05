class UsersController < ApplicationController
  before_action :signed_in_user, only: [:edit, :update]
  before_action :correct_user,   only: [:edit, :update]
  def new
    @user = User.new
  end

  def index
    # @users = User.all
    # @user = User.find(params[:id])
    @user = User.find(session[:user_id]) if session[:user_id]
  end

  def create
    @user = User.new(user_params)
      # if @user.save
      #   sign_in @user
      #   redirect_to @user, :notice => "Welcome to Shopping Obsession"  #this may need to redirect to the index page
      # else
      #   render 'new'
      # end
    respond_to do |format|
      if @user.save
        sign_in @user
        format.html { redirect_to @user, notice: 'Welcome to Shopping Obsession.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def edit
    @user = User.find(params[:id])    
  end

  def update
    @user = User.find(params[:id])  
    if @user.update_attributes(user_params)
      redirect_to @user, :notice => "Profile updated"  #this may need to redirect to the index page
    else
      render 'edit'
    end
  end

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render :json => @user.to_json }
    end
    # render :json => @user.to_json
  end


  private

    def user_params
      params.require(:user).permit(:username, :email, :shoe_size, :password, :password_confirmation)
    end

    def signed_in_user
      unless signed_in?
        store_location
        redirect_to signin_url, notice: "Please sign in." 
      end
    end

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end
end
