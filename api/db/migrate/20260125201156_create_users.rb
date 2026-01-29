class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users, if_not_exists: true do |t|
      t.string :username
      t.datetime :last_login
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.integer :roles

      t.timestamps
    end
  end
end
