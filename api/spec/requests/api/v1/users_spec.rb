require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
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

  describe 'GET /api/v1/users' do
    context "when the request is valid" do
      before do
        get "/api/v1/users", params: {}, headers: headers
      end

      it 'returns all of the users' do
        # Note that 'json' is a custom helper
        expect(json).not_to be_empty
        expect(json.size).to eq(User.all.size)
      end
  
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe 'GET /api/v1/users/:id' do
    context "when the request is valid" do
      before do
        get "/api/v1/users/#{user.id}", params: {}, headers: headers
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
      
      it "returns the user" do
        expect(json["id"]).to eq(user.id)
        expect(json["username"]).to eq(user.username)
        expect(json["first_name"]).to eq(user.first_name)
        expect(json["last_name"]).to eq(user.last_name)
        expect(json["roles"]).to eq(user.roles)

        # It should not include the password digest
        expect(json["password_digest"]).to be_nil
      end
    end

    context "when the request is not valid" do
      before do
        get "/api/v1/users/#{user.id + 1000}", params: {}, headers: headers
      end

      it "returns status code 404" do
        expect(response).to have_http_status(404)
      end
    end
  end

  describe 'POST /api/v1/users' do
    context "when the request is valid" do
      before do
        @user_params = {
                          username: "henry_rollins@sst.net",
                          first_name: "Henry",
                          last_name: "Rollins",
                          roles: 0,
                        }
        @post_params = {
                          user: @user_params,
                          commit: "Create"
                      }
        post "/api/v1/users", params: @post_params.to_json, headers: headers
      end
    
      it "returns status code 201" do
        expect(response).to have_http_status(201)
      end

      it "creates a user" do
        expect(json["username"]).to eq(@user_params[:username])
        expect(json["first_name"]).to eq(@user_params[:first_name])
        expect(json["last_name"]).to eq(@user_params[:last_name])
        expect(json["roles"]).to eq(@user_params[:roles])
  
        # It should not include the password digest
        expect(json["password_digest"]).to be_nil
      end
    end

    context "when the request is not valid" do
      before do
        @user_params = {
                          # username: "henry_rollins@sst.net",
                          first_name: "Henry",
                          last_name: "Rollins",
                          roles: 0,
                        }
        @post_params = {
                          user: @user_params,
                          commit: "Create"
                      }
        post "/api/v1/users", params: @post_params, headers: headers
      end

      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end
    end
  end

  describe 'PUT /api/v1/users/:id' do
    context "when the request is valid" do
      before do
        @user_params = {
          first_name: "Henrietta",
        }
        @put_params = {
                        user: @user_params,
                        commit: "Create"
                      }
        put "/api/v1/users/#{user.id}", params: @put_params.to_json, headers: headers
      end

      it "returns status code 204" do
        expect(response).to have_http_status(204)
      end

      it "updates the user record" do
        user.reload

        expect(user.first_name).to eq(@user_params[:first_name])
      end
    end

    context "when the request is not valid" do
      before do
        @user_params = {
                          first_name: "Henrietta",
                          username: "",
                       }
        @put_params = {
                        user: @user_params,
                        commit: "Create",
                      }
        put "/api/v1/users/#{user.id}", params: @put_params.to_json, headers: headers
      end

      it "returns status code 422" do
        expect(response).to have_http_status(422)
      end

      it "does not update the user record" do
        user.reload

        expect(user.first_name).not_to eq(@user_params[:first_name])
      end
    end
  end

end
