require 'spec_helper'

describe "User pages" do 

  subject { page }

  describe "profile page" do
    let(:user) { FactoryGirl.create(:user) }
    before { visit user_path(user) }

    it { should have_content(user.username) }
    it { should have_title(user.username)}
  end

  describe "signup page" do
    before { visit signup_path}

    it { should have_content('Sign up') }
    it { should have_title(full_title('Sign up')) }
  end
  
  describe "signup" do
    before { visit signup_path }

    let(:submit) { "Create my account" }

    describe "with invalid information" do
      it "should not create a user" do
        expect { click_button submit }.not_to change(User, :count)
      end
    end

    describe "with valid information" do
      before do
        fill_in "Username",       with: "Lisageez"
        fill_in "Email",          with: "lisa@example.com"
        fill_in "Shoe size",      with: "9"
        fill_in "Password",       with: "dogbites"
        fill_in "Confimation",    with: "dogbites"  
      end

      it "should create a user" do
        expect { click_button submit }.to change(User, :count).by(1)
      end

      describe "after saving the user" do
        before { click_button submit }
        let(:user) { User.find_by(email: 'user@example.com') }

        it { should have_link('Sign out') }
        it { should have_title(user.username) }
        it { should have_selector('div.aler.alert-success', text: 'Welcome to Shopping Obsession') } 
      end
    end
  end

  describe "edit" do
    let(:user) { FactoryGirl.create(:user) }
    before { visit edit_user_path(user) }

    describe "page" do
      it { should have_content("Update your profile") }
      it { should have_title("Edit user") }
    end

    describe "with invalid information" do
      before { click_button "Save changes" }

      it { should have_content('error') }
    end

    describe "with valid information" do
      let(:new_username) { "New Username" }
      let(:new_email) { "new@example.com" }
      before do
        fill_in "Username",         with: new_username
        fill_in "Email",            with: new_email
        fill_in "Password",         with: user.password
        fill_in "Confirm password"  with: user.password
        click_button "Save changes"
      end

      it { should have_title(new_username) }
      it { should have_selector('div.alert.alert-success') }
      it { should have_link('Sign out', href: signout_path) }
      specify { expect(user.reload.username).to eq new_username }
      specify { expect(user.reload.emai).to eq new_email } 
    end
  end
end