class AddDressSizeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :dress_size, :string
  end
end
