# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    username "lisageez"
    email "lisa@example.com"
    shoe_size "7"
    password "dogbites"
    password_confirmation "dogbites"
  end
end
