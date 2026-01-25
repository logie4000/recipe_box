class CreateRecipes < ActiveRecord::Migration[8.1]
  def change
    create_table :recipes, if_not_exists: true do |t|
      t.string :title
      t.text :description
      t.text :note
      t.string :image

      t.timestamps
    end

    add_reference :recipes, :author, null: false, foreign_key: { to_table: :users }  
  end
end
