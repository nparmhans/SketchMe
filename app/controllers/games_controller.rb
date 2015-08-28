class GamesController < ApplicationController

	def index
	end

	def categories
	end

	def create
		place = ["California", "Paris", "New York", "Washington DC"]
		person = ["Oscar Vasquez", "Brian Chae", "Jo Min", "Kyle Shin"]
		thing = ["iPod", "flower", "pencil", "car"]

		if params[:category] == "Place"
			word = place[rand(0...place.length)]
		elsif params[:category] == "Person"
			word = person[rand(0...person.length)]
		elsif params[:category] == "Thing"
			word = thing[rand(0...thing.length)]
		end
		flash[:word] = word
		redirect_to "/games"
	end

end