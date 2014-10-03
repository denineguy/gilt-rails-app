class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def index
    @users = User.all
  end

  def create
    @user = User.new(user_params)
      if @user.save
        sigin_in @user
        redirect_to @user, :notice => "Welcome to Shopping Obsession"  #this may need to redirect to the index page
      else
        render 'new'
      end
    #   respond_to do |format|
    #   if @user.save
    #     format.html { redirect_to @user, notice: 'User was successfully created.' }
    #     format.json { render :show, status: :created, location: @user }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @user.errors, status: :unprocessable_entity }
    #   end
    # end
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
  end


  private

    def user_params
      params.require(:user).permit(:username, :email, :shoe_size, :password, :password_confirmation)
    end
end
