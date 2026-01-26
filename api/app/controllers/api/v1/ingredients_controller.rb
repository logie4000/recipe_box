class Api::V1::IngredientsController < ApplicationController
  before_action :set_ingredient, only: %i[ show update destroy ]

  # GET /ingredients
  def index
    if (params[:recipe_id])
      @recipe = Recipe.find(params[:recipe_id])
      @ingredienets = @recipe.ingredients
    else
      @ingredients = Ingredient.all
    end
    
    render json: @ingredients
  end

  # GET /ingredients/1
  def show
    render json: @ingredient
  end

  # POST /ingredients
  def create
    @ingredient = Ingredient.new(ingredient_params)

    if @ingredient.save
      render json: @ingredient, status: :created, location: @ingredient
    else
      render json: @ingredient.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /ingredients/1
  def update
    if @ingredient.update(ingredient_params)
      render json: @ingredient
    else
      render json: @ingredient.errors, status: :unprocessable_content
    end
  end

  # DELETE /ingredients/1
  def destroy
    @ingredient.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ingredient
      @ingredient = Ingredient.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def ingredient_params
      params.expect(ingredient: [ :position, :value, :recipe_id ])
    end
end
