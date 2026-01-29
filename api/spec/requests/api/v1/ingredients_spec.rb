require 'rails_helper'

RSpec.describe "Api::V1::Ingredients", type: :request do
    # initialize test data
    let!(:user) { create(:user) }
    let!(:headers) { valid_headers }
    
    let!(:recipe) { create(:recipe, author_id: user.id) }
    let!(:directions) { create_list(:direction, SIZE_DIRECTION_LIST, recipe_id: recipe.id) }
    let!(:ingredients) { create_list(:ingredient, SIZE_INGREDIENT_LIST, recipe_id: recipe.id) }
  
    describe "PUT /api/v1/ingredients/:id" do
      context "when the request is valid" do
        before do
          @new_value = "kosher salt"
          @ingredient_params = { value: @new_value,
                            }
          @put_params = {  ingredient: @ingredient_params,
                            commit: "Create",
                          }
          put "/api/v1/ingredients/#{ingredients.first.id}", params: @put_params.to_json, headers: headers
        end
  
        it 'returns a status code 204' do
          expect(response).to have_http_status(204)
        end
  
        it 'updates the record' do
          expect(response.body).to be_empty
          expect(Ingredient.find(ingredients.first.id).value).to eq(@new_value)
        end
      end
  
      context "when the request is invalid" do
        before do
          @ingredient_params = {
                                value: "",
                                position: 123,
                            }
          @put_params = {  ingredient: @ingredient_params,
                            commit: "Create",
                          }
          put "/api/v1/ingredients/#{ingredients.first.id}", params: @put_params.to_json, headers: headers
        end
  
        it 'returns a status code 422' do
          expect(response).to have_http_status(422)
        end
    
        it "does not update the record" do
          ingredients.first.reload

          expect(ingredients.first.value).not_to eq(@ingredient_params[:value])
        end
      end
    end
  
    describe "GET /api/v1/recipes/:id/ingredients" do
      context "when the request is valid" do
        before { get "/api/v1/recipes/#{recipe.id}/ingredients", params: {}, headers: headers }
  
        it 'returns the recipe ingredients' do
          expect(json).not_to be_empty
          expect(json.size).to eq(ingredients.size)
        end
  
        it 'returns a status code 200' do
          expect(response).to have_http_status(200)
        end
      end
  
      context "when the request is invalid" do
        before { get "/api/v1/recipes/#{recipe.id + 1000}/ingredients", params: {}, headers: headers }
  
        it 'returns a status code 404' do
          expect(response).to have_http_status(404)
        end
      end
    end
  end
