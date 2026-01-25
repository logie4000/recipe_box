class CreateDirections < ActiveRecord::Migration[8.1]
  def change
    create_table :directions do |t|
      t.integer :position
      t.text :step
      t.references :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
