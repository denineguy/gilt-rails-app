class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
    else
      flash.now[:error] = 'Invalid email/password combination' #Not quite right!
      render 'new'
    end
  end

  def destroy
  end

end
