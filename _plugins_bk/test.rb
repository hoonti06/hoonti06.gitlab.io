require 'open3'

def replace_code_block_to_rouge_liquid(content, lineno)
  regex = /[[:blank:]]*\`\`\`(.*)\n([\w\W]*?)[[:blank:]]*\`\`\`[[:blank:]]*(\n|$)/

  print(content.scan(regex).length, "\n")
  print(content.scan(regex), "\n")

  content = content.gsub(regex) { |_|
    match = Regexp.last_match
    lang = match[1].delete(' ')

    print("1 : ", lang, "\n")
    print("2 : ", match[2], "\n")


    res = ""
    if match && lang.length > 0
      res = "{% highlight #{lang}"
      if lineno
        res += " linenos"
      end
      res += " %}\n #{match[2]}{% endlighlight %}#{match[3]}"
    else
      res = match
    end
    res
  }

  print("\n\n<RES>\n", content, "\n")

end

def get_list_of_supported_langauges()

  cmd = "bundle exec rougify list"
  language_list = []

  Open3::popen3(cmd) do |stdin, stdout, stderr, thread|
    stdin.close

    output = stdout.read.strip
    STDERR.print stderr.read

    language_list = output.scan(/[^\(](\w+):.*/).to_a
    language_list.collect! { |lang|
      lang[0].to_s
    }
    
    aliases_list = output.scan(/\[aliases: (.*)\]/).to_a
    aliases_list.each do |aliases|
      language_list += aliases.join().strip.split(',')
    end
    language_list = language_list.uniq
#    puts (language_list)
    
    # Wait for the process to finish
    thread.value
  end
  language_list
end

str = "  \`\`\`  cpp  \n"
str +=  "int a = 10;\n"
str += "\`\`\`cpp\n"
str += "printf(\"\");\n"
str += " \`\`\`  \n"
str += "\`\`\`java\n"
str += "Arraylist list = new Arraylist();\n"
str += "System.out.pirntln(\"\");\n"
str += "  \`\`\`  \n"
str += " \`\`\` \n"
str += "$ sudo su\n"
str += "# apt-get install ruby\n"
str += "  \`\`\`  "

# replace_code_block_to_rouge_liquid(str, true)


lang_list = get_list_of_supported_langauges()

puts (lang_list.include?("c++"))
puts (lang_list.include?("java"))
puts (lang_list.include?("javascript"))
puts (lang_list.include?("cpp"))



