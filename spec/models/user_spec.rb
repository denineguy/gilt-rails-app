require 'spec_helper'

RSpec.describe User, :type => :model do
  
  before { @user = User.new(username: "Lisa Example", email: "lisa@example.com") }

  subject { @user }

  it { should respond_to(:username) }
  it { should respond_to(:email) }

  it { should be_valid }

  describe "when name is not present" do
    before { @user.username = " " }
    it { should_not be_valid }
  end

  describe "when email is not present" do
    before { @user.email = " "}
    it { should_not be_valid }
  end

  describe "when name is too long" do
    before { @user.username = "a" * 51 }
    it { should_not be_valid }
  end
end
