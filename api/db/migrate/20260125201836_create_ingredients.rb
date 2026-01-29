class CreateIngredients < ActiveRecord::Migration[8.1]
  def change
    create_table :ingredients do |t|
      t.integer :position
      t.string :value
      t.references :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
