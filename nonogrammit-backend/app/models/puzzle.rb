class Puzzle < ApplicationRecord
    has_many :games

    def add_info
        solution_hash = solution_hasher
        self.row_params = solution_hash[:row_params]
        self.column_params = solution_hash[:column_params]
        self.solution = solution_hash[:solution_html_ids]
    end

    def find_max_array_size(hash_of_stringed_arrays)
        max_length = 0
        hash_of_stringed_arrays.each_value do |stringed_array|
            size = stringed_array.split(", ").length
            max_length = size if size > max_length
        end
        max_length
    end

    def column_max
        find_max_array_size(self.column_params)
    end

    def row_max
        find_max_array_size(self.row_params)
    end

    private
    # possible algorithm could include inserting solutions into squares selected by finding blanks where there is at least 1
    # solution to its left or right and at least 1 solution above or below
    # this should significantly decerease the number of 1s in parameters
    def randomize(array)
        array.each_with_index do |number, i|
            j = rand(0..array.size)
            array[i],array[j]=array[j],array[i]
        end
        array
    end
    
    def sample_of_625(n)
        (0..624).to_a.sample(n)
    end
    
    def solution_div_indices_to_html_ids(arry)
      arry.collect do |number|
        number = number.to_i
        "#{number/25 + 1}-#{number%25+1}"
      end
    end
        
    def solution_html_ids_to_coordinates(solutions)
        solutions.collect do |coordinates|
            coordinates.split("-")
        end
    end
    
    def collectRow(i, solution_coordinates)
        solution_coordinates.select do |coordinates|
            coordinates[1]==i.to_s
        end
    end
    
    
    def createRowParams(particular_row_params)
        sorted = particular_row_params.sort_by{|coord| coord[0].to_i}
            parameters = []
            p=1
            for i in 0...sorted.length-1
                if sorted[i][0].to_i+1 == sorted[i+1][0].to_i
                p+=1
                else
                parameters << p
                p = 1
                end
            end
            parameters << p
        parameters.join(", ")
    end
    
    def createAllRowParams(solution_coordinates)
        hash = {}
            for i in 1..25
                hash[i] = createRowParams(collectRow(i, solution_coordinates))
            end
        hash
    end
    
    def collectColumn(i, solution_coordinates)
        solution_coordinates.select do |coordinates|
            coordinates[0]==i.to_s
        end
    end
       
    def createColumnParams(particular_column_params)
        sorted = particular_column_params.sort_by{|coord| coord[1].to_i}
        parameters = []
        p=1
        for i in 0...sorted.length-1
            if sorted[i][1].to_i+1 == sorted[i+1][1].to_i
                p+=1
            else
                parameters << p
                p = 1
            end
        end
        parameters << p
        parameters.join(", ")
    end
    
    def createAllColumnParams(solution_coordinates)
        hash = {}
        for i in 1..25
            hash[i] = createColumnParams(collectColumn(i, solution_coordinates))
        end
        hash
    end
        
    def solution_coordinates_sanitizer(solution_coordinates)
        good_solution_coordinates = []
        solution_coordinates.each_with_index do |solution_coordinate_to_check, check_index|
            possibilities = []
            possibilities.push(["#{(solution_coordinate_to_check[0].to_i)+1}", "#{solution_coordinate_to_check[1]}"])
            possibilities.push(["#{(solution_coordinate_to_check[0].to_i)-1}", "#{solution_coordinate_to_check[1]}"])
            possibilities.push(["#{solution_coordinate_to_check[0]}", "#{(solution_coordinate_to_check[1].to_i)+1}"])
            possibilities.push(["#{solution_coordinate_to_check[0]}", "#{(solution_coordinate_to_check[1].to_i)-1}"])
            good_solution = false
            possibilities.each do |possible_close_solution|
                if solution_coordinates.include?(possible_close_solution)
                    good_solution = true
                end
            end
            if good_solution
                good_solution_coordinates << solution_coordinate_to_check
            end
        end
        good_solution_coordinates
    end

    def super_sanitizer(solution_coordinates)
        sanitized_solution_coordinates = solution_coordinates_sanitizer(solution_coordinates) # what happens if we don't sanitize
        all_coordinates = []
        for i in 1..25
            for j in 1..25
                all_coordinates << [i.to_s, j.to_s]
            end
        end
        non_solutions = all_coordinates - sanitized_solution_coordinates        
        blanks_with_near_solutions = non_solutions.select do |non_solution_coordinates|
            to_the_right = sanitized_solution_coordinates.include?(["#{(non_solution_coordinates[0].to_i)+1}", non_solution_coordinates[1]])
            to_the_left = sanitized_solution_coordinates.include?(["#{(non_solution_coordinates[0].to_i)-1}", non_solution_coordinates[1]])
            to_the_top = sanitized_solution_coordinates.include?([non_solution_coordinates[0], "#{(non_solution_coordinates[1].to_i)+1}"])
            to_the_bottom = sanitized_solution_coordinates.include?([non_solution_coordinates[0], "#{(non_solution_coordinates[1].to_i)-1}"])
            # (to_the_left && to_the_right && to_the_bottom) || (to_the_left && to_the_right && to_the_top) || (to_the_left && to_the_top && to_the_bottom) || (to_the_right && to_the_bottom && to_the_top)
            (to_the_left && to_the_right) || (to_the_top && to_the_bottom)

        end
        squares_to_add = 313-(sanitized_solution_coordinates.size)
        percent_added = squares_to_add/blanks_with_near_solutions.size.to_f
        (0...blanks_with_near_solutions.size).to_a.sample(squares_to_add).each do |index_of_blank_to_add|
            sanitized_solution_coordinates << blanks_with_near_solutions[index_of_blank_to_add]
        end
        sanitized_solution_coordinates
    end
    
    def solution_hasher
        solution_html_ids = solution_div_indices_to_html_ids(sample_of_625(285))
        solution_coordinates = solution_html_ids_to_coordinates(solution_html_ids)
        # solution_coordinates_sanitized = solution_coordinates_sanitizer(solution_coordinates)
        solution_coordinates_sanitized = super_sanitizer(solution_coordinates)
        sanitized_solution_html_ids = solution_coordinates_sanitized.collect do |coordinate_array| 
            coordinate_array.join("-")
        end
        solutions_hash = {
            "solution_html_ids": sanitized_solution_html_ids,
            "row_params": createAllRowParams(solution_coordinates_sanitized),
            "column_params": createAllColumnParams(solution_coordinates_sanitized)
        }
    end
      
end
