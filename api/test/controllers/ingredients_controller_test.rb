require "test_helper"

class IngredientsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @ingredient = ingredients(:one)
  end

  test "should get index" do
    get ingredients_url, as: :json
    assert_response :success
  end

  test "should create ingredient" do
    assert_difference("Ingredient.count") do
      post ingredients_url, params: { ingredient: { position: @ingredient.position, recipe_id: @ingredient.recipe_id, value: @ingredient.value } }, as: :json
    end

    assert_response :created
  end

  test "should show ingredient" do
    get ingredient_url(@ingredient), as: :json
    assert_response :success
  end

  test "should update ingredient" do
    patch ingredient_url(@ingredient), params: { ingredient: { position: @ingredient.position, recipe_id: @ingredient.recipe_id, value: @ingredient.value } }, as: :json
    assert_response :success
  end

  test "should destroy ingredient" do
    assert_difference("Ingredient.count", -1) do
      delete ingredient_url(@ingredient), as: :json
    end

    assert_response :no_content
  end
end
