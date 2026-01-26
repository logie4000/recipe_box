class Api::V1::RecipesController < ApplicationController
  before_action :set_recipe, only: %i[ show update destroy ]

  # GET /recipes
  def index
    if (params[:user_id])
      @user = User.find(params[:user_id])
      @recipes = @user.recipes
    else
      @recipes = Recipe.all
    end
    
    render json: @recipes
  end

  # GET /recipes/1
  def show
    render json: @recipe
  end

  # POST /recipes
  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.save
      render json: @recipe, status: :created, location: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /recipes/1
  def update
    if @recipe.update(recipe_params)
      p = 0
      @recipe.directions.each do |direction|
        direction.position = p
        direction.save!
        p += 1
      end

      render json: @recipe
    else
      render json: @recipe.errors, status: :unprocessable_content
    end
  end

  # DELETE /recipes/1
  def destroy
    @recipe.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def recipe_params
      params.expect(recipe: [ :title, :description, :note, :author_id, :image_url ])
    end
end
