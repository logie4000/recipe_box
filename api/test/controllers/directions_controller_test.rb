require "test_helper"

class DirectionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @direction = directions(:one)
  end

  test "should get index" do
    get directions_url, as: :json
    assert_response :success
  end

  test "should create direction" do
    assert_difference("Direction.count") do
      post directions_url, params: { direction: { position: @direction.position, recipe_id: @direction.recipe_id, step: @direction.step } }, as: :json
    end

    assert_response :created
  end

  test "should show direction" do
    get direction_url(@direction), as: :json
    assert_response :success
  end

  test "should update direction" do
    patch direction_url(@direction), params: { direction: { position: @direction.position, recipe_id: @direction.recipe_id, step: @direction.step } }, as: :json
    assert_response :success
  end

  test "should destroy direction" do
    assert_difference("Direction.count", -1) do
      delete direction_url(@direction), as: :json
    end

    assert_response :no_content
  end
end
