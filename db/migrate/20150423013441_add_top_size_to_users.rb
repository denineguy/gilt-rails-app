class AddTopSizeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :top_size, :string
  end
end
