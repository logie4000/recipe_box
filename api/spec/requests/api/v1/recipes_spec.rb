require 'rails_helper'

RSpec.describe "Api::V1::Recipes", type: :request do
  # initialize test data
  let!(:user) { create(:user) }
  let!(:other_user) { create(:user) }
  let!(:headers) { valid_headers }
  
  let!(:recipe_1) { create(:recipe, author_id: user.id) }
  let!(:directions_1) { create_list(:direction, SIZE_DIRECTION_LIST, recipe_id: recipe_1.id) }
  let!(:ingredients_1) { create_list(:ingredient, SIZE_INGREDIENT_LIST, recipe_id: recipe_1.id) }
  
  let!(:recipe_2) { create(:recipe, author_id: user.id) }
  let!(:directions_2) { create_list(:direction, SIZE_DIRECTION_LIST, recipe_id: recipe_2.id) }
  let!(:ingredients_2) { create_list(:ingredient, SIZE_INGREDIENT_LIST, recipe_id: recipe_2.id) }
  
  let!(:recipe_3) { create(:recipe, author_id: other_user.id) }
  let!(:directions_3) { create_list(:direction, SIZE_DIRECTION_LIST, recipe_id: recipe_3.id) }
  let!(:ingredients_3) { create_list(:ingredient, SIZE_INGREDIENT_LIST, recipe_id: recipe_3.id) }
   
  describe 'GET /api/v1/recipes' do
    # make HTTP request before each example
    before { get '/api/v1/recipes', params: {}, headers: headers }

    it 'returns all of the recipes' do
      # Note that 'json' is a custom helper
      expect(json).not_to be_empty
      expect(json.size).to eq(Recipe.all.size)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /api/v1/recipes/:id
  describe 'GET /api/v1/recipes/:id' do
    context 'when the record exists' do
      before { get "/api/v1/recipes/#{recipe_1.id}", params: {}, headers: headers }

      it 'returns the recipe' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(recipe_1.id)
        expect(json['title']).to eq(recipe_1.title)
        expect(json['description']).to eq(recipe_1.description)
        expect(json['note']).to eq(recipe_1.note)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      before { get "/api/v1/recipes/#{recipe_1.id + 200}", params: {}, headers: headers }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end
    end
  end

  describe 'POST /api/v1/recipes' do
    context 'when the request is valid' do
      before do
        @recipe_params = {  title: recipe_1.title,
                            description: recipe_1.description,
                            note: recipe_1.note,
                            image: recipe_1.image,
                            author_id: user.id
                          }
        @post_params = {  recipe: @recipe_params,
                          commit: "Create",
                        }
        post "/api/v1/recipes", params: @post_params.to_json, headers: headers
      end

      it 'returns a status code 201' do
        expect(response).to have_http_status(201)
      end

      it 'creates a recipe' do
        expect(json).not_to be_empty
        expect(json['title']).to eq(recipe_1.title)
        expect(json['description']).to eq(recipe_1.description)
        expect(json['note']).to eq(recipe_1.note)

        expect(json['id']).not_to eq(recipe_1.id)
      end
    end

    context 'when the request is not valid' do
      before do
        @recipe_params = {  # title: recipe_1.title,
                            description: recipe_1.description,
                            note: recipe_1.note,
                            image: recipe_1.image,
                            author_id: user.id
                          }
        @post_params = {  recipe: @recipe_params,
                          commit: "Create",
                        }
        post "/api/v1/recipes", params: @post_params.to_json, headers: headers
      end

      it 'returns a status code 422' do
        expect(response).to have_http_status(422)
      end
    end

    context 'when the request is valid with nested attributes' do
      before do
        @recipe_params = {  title: recipe_1.title,
                            description: recipe_1.description,
                            note: recipe_1.note,
                            author_id: user.id,
                            ingredients_attributes: [
                              {
                                position: ingredients_1.first.position, 
                                value: ingredients_1.first.value,
                              },
                              {
                                position: ingredients_1.last.position, 
                                value: ingredients_1.last.value,
                              },
                            ],
                            directions_attributes: [
                              {
                                position: directions_1.first.position, 
                                step: directions_1.first.step,
                              },
                              {
                                position: directions_1.last.position, 
                                step: directions_1.last.step,
                              },
                            ],
                          }
        @post_params = {  recipe: @recipe_params,
                          commit: "Create",
                        }
        post "/api/v1/recipes", params: @post_params.to_json, headers: headers
      end

      it 'returns a status code 201' do
        expect(response).to have_http_status(201)
      end

      it 'creates a recipe' do
        expect(json).not_to be_empty
        expect(json['title']).to eq(recipe_1.title)
        expect(json['description']).to eq(recipe_1.description)
        expect(json['note']).to eq(recipe_1.note)

        expect(json['id']).not_to eq(recipe_1.id)
      end

      it 'adds ingredients and directions' do
        @new_recipe = Recipe.last
        @new_ingredient = Ingredient.last
        @new_direction = Direction.last

        expect(@new_recipe.ingredients).to include(@new_ingredient)
        expect(@new_recipe.directions).to include(@new_direction)
      end
    end
  end

  describe 'PUT /api/v1/recipes/:id' do
    context 'when the request is valid' do
      before do
        @new_title = "Egg nog"
        @ingredient_for_deletion = ingredients_1.last
        @direction_for_deletion = directions_1.last

        @recipe_params = {  title: @new_title,
                            ingredients_attributes: [
                              {
                                id: ingredients_1.first.id, 
                                value: "New ingredient",
                              },
                              {
                                id: @ingredient_for_deletion.id,
                                _destroy: "1",
                              },
                            ],
                            directions_attributes: [
                              {
                                id: directions_1.first.id,
                                step: "New direction",
                              },
                              {
                                id: @direction_for_deletion.id,
                                _destroy: "1",
                              },
                            ],
                          }
        @post_params = {  recipe: @recipe_params,
                          commit: "Create",
                        }
        put "/api/v1/recipes/#{recipe_1.id}", params: @post_params.to_json, headers: headers
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the record' do
        recipe_1.reload
        ingredients_1.first.reload
        directions_1.first.reload

        expect(response.body).to be_empty
        expect(recipe_1.title).to eq(@new_title)
        expect(ingredients_1.first.value).to eq("New ingredient")
        expect(directions_1.first.step).to eq("New direction")
      end
      
      it 'deletes the child objects as requested' do
        recipe_1.reload

        expect(recipe_1.ingredients).not_to include(@ingredient_for_deletion)
        expect(recipe_1.directions).not_to include(@direction_for_deletion)
      end
    end

    context 'when the request is not valid' do
      before do
        @recipe_params = {  title: '',
                            description: "New description",
                            note: recipe_1.note,
                            author_id: user.id,
                            ingredients_attributes: [
                              {
                                id: ingredients_1.first.id,
                                position: ingredients_1.first.position, 
                                value: "New ingredient",
                              },
                              {
                                id: ingredients_1.last.id,
                                position: ingredients_1.last.position, 
                                value: ingredients_1.last.value,
                              },
                            ],
                            directions_attributes: [
                              {
                                id: directions_1.first.id,
                                position: directions_1.first.position, 
                                step: "New direction",
                              },
                              {
                                id: directions_1.last.id,
                                position: directions_1.last.position, 
                                step: directions_1.last.step,
                              },
                            ],
                          }
        @post_params = {  recipe: @recipe_params,
                            commit: "Create",
                         }
        put "/api/v1/recipes/#{recipe_1.id}", params: @post_params.to_json, headers: headers
      end

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it "does not update the record" do
        recipe_1.reload

        expect(recipe_1.description).not_to eq(@recipe_params[:description])
      end
    end
  end

  describe "GET /api/v1/users/:id/recipes" do
    context "when the request is valid" do
      before do
        get "/api/v1/users/#{user.id}/recipes", params: {}, headers: headers
      end

      it "returns the user's recipes" do
        expect(json).not_to be_empty
        expect(json.size).to eq(user.recipes.size)
        expect(json).not_to include(recipe_1)
        expect(json).not_to include(recipe_2)
      end

      it "does not include the other user's recipes" do
        expect(json).not_to be_empty
        expect(json.size).to eq(user.recipes.size)
        expect(json).not_to include(recipe_3)
      end

      it 'returns a status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context "when the request is not valid" do
      before do
        get "/api/v1/users/#{user.id + 1000}/recipes", params: {}, headers: headers
      end

      it 'returns a status code 404' do
        expect(response).to have_http_status(404)
      end
    end
  end
end
