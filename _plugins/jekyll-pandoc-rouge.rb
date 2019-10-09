require 'open3'

def get_supported_langauge_list()

  language_list = []

  cmd = "bundle exec rougify list"
  Open3::popen3(cmd) do |stdin, stdout, stderr, thread|
    stdin.close

    output = stdout.read.strip
    STDERR.print stderr.read

    language_list = output.scan(/[^\(](\w+):.*/).to_a
    language_list.collect! { |language|
      language[0].to_s
    }
#    puts (language_list)
    
    aliases_list = output.scan(/\[aliases: (.*)\]/).to_a
    aliases_list.each do |aliases|
      language_list += aliases.join().strip.split(',')
    end
    language_list = language_list.uniq.sort
#    puts (language_list)
    
    # Wait for the process to finish
    thread.value
  end
  language_list
end

$supported_language_list = get_supported_langauge_list()


Jekyll::Hooks.register :documents, :pre_render do |doc|
  next if doc['ext'] != ".md"

  config = doc.site.config

  next if config["markdown"] == nil or config["markdown"].downcase != "Pandoc".downcase
  next if config["highlighter"] == nil or config["highlighter"] != "rouge"

  next if config["pandoc_rouge"] == nil or config["pandoc_rouge"]["use"] == nil \
    or config["pandoc_rouge"]["use"] != true
    
  lineno = config["pandoc_rouge"]["lineno"]["use"]

  doc.content = replace_code_block_with_rouge_liquid(doc.content, lineno)
end

def replace_code_block_with_rouge_liquid(content, lineno)

  regex = /[[:blank:]]*\`\`\`(.*)\n([\w\W]*?)[[:blank:]]*\`\`\`[[:blank:]]*(\n|$)/

  content = content.gsub(regex) { |_|
    match = Regexp.last_match
    language = match[1].strip

    if match and language.length > 0 and $supported_language_list.include?(language)
      res = "{% highlight #{language}"
      if lineno
        res += " linenos"
      end
      res += " %}\n#{match[2]}\n{% endhighlight %}#{match[3]}"
    else
      res = match
    end
    res
  }
  return content
end 
