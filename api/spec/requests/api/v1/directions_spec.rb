require 'rails_helper'

RSpec.describe "Api::V1::Directions", type: :request do
    # initialize test data
  let!(:user) { create(:user) }
  let!(:headers) { valid_headers }
  
  let!(:recipe) { create(:recipe, author_id: user.id) }
  let!(:directions) { create_list(:direction, SIZE_DIRECTION_LIST, recipe_id: recipe.id) }
  let!(:ingredients) { create_list(:ingredient, SIZE_INGREDIENT_LIST, recipe_id: recipe.id) }

  describe "PUT /api/v1/directions/:id" do
    context "when the request is valid" do
      before do
        @new_value = "boil for 10 minutes"
        @direction_params = { step: @new_value,
                          }
        @put_params = {  direction: @direction_params,
                          commit: "Create",
                        }
        put "/api/v1/directions/#{directions.first.id}", params: @put_params.to_json, headers: headers
      end

      it 'returns a status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the record' do
        expect(response.body).to be_empty
        expect(Direction.find(directions.first.id).step).to eq(@new_value)
      end
    end

    context "when the request is invalid" do
      before do
        @direction_params = {
                              step: "",
                              position: 123,
                          }
        @put_params = {  direction: @direction_params,
                          commit: "Create",
                        }
        put "/api/v1/directions/#{directions.first.id}", params: @put_params.to_json, headers: headers
      end

      it 'returns a status code 422' do
        expect(response).to have_http_status(422)
      end

      it "does not update the record" do
        directions.first.reload

        expect(directions.first.step).not_to eq(@direction_params[:step])
      end
    end
  end

  describe "GET /api/v1/recipes/:id/directions" do
    context "when the request is valid" do
      before { get "/api/v1/recipes/#{recipe.id}/directions", params: {}, headers: headers }

      it 'returns the recipe directions' do
        expect(json).not_to be_empty
        expect(json.size).to eq(directions.size)
      end

      it 'returns a status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context "when the request is invalid" do
      before { get "/api/v1/recipes/#{recipe.id + 1000}/directions", params: {}, headers: headers }

      it 'returns a status code 404' do
        expect(response).to have_http_status(404)
      end
    end
  end
end
