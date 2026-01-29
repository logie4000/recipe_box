# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_01_25_201959) do
  create_table "directions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "position"
    t.integer "recipe_id", null: false
    t.text "step"
    t.datetime "updated_at", null: false
    t.index ["recipe_id"], name: "index_directions_on_recipe_id"
  end

  create_table "ingredients", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "position"
    t.integer "recipe_id", null: false
    t.datetime "updated_at", null: false
    t.string "value"
    t.index ["recipe_id"], name: "index_ingredients_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.integer "author_id", null: false
    t.datetime "created_at", null: false
    t.text "description"
    t.string "image"
    t.text "note"
    t.string "title"
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_recipes_on_author_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "first_name"
    t.datetime "last_login"
    t.string "last_name"
    t.string "password_digest"
    t.integer "roles"
    t.datetime "updated_at", null: false
    t.string "username"
  end

  add_foreign_key "directions", "recipes"
  add_foreign_key "ingredients", "recipes"
  add_foreign_key "recipes", "users", column: "author_id"
end
